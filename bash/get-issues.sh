#!/usr/bin/env bash
# template from https://betterprogramming.pub/my-minimal-safe-bash-script-template-300759114040
#
set -o errexit
set -o nounset
set -o pipefail

readonly script_name="${0##*/}"

baseurl="https://jira-test.sunet.se/rest/api/2"
username="restsunetweb"
password="F8rjUCqKZx86HQ3YGT7dJwWC4r-A-t"
output="."

trap clean_up ERR EXIT SIGINT SIGTERM

usage() {
    cat <<USAGE_TEXT
Usage: ${script_name} [-h | --help] [-u <username>] [-p <password>] [-b <baseurl>] [-o <output dir>]

DESCRIPTION
    Get JIRA tickets to be shown at sunet.se

OPTIONS:
-h, --help
        Print this help and exit.
-u
        The username for a JIRA account.
-p
        The password for the JIRA account.
-b
        Base URL for the JIRA REST API, with no final slash.
-o
        Directory in which to put the retrieved data.
USAGE_TEXT
}

clean_up() {
  trap - ERR EXIT SIGINT SIGTERM
  # Remove temporary files/directories, log files or rollback changes.
}

die() {
  local -r msg="${1}"
  local -r code="${2:-90}"
  echo "${msg}" >&2
  exit "${code}"
}

join_arr() {
  local IFS="$1"
  shift
  echo "$*"
}

external_comment_ids() {
  local -r issueid="$1"
  issue_url="$baseurl/issue/${issueid}/comment?expand=properties"
  
  jq_remove_null_properties=".comments[] | select(.properties != null)"
  jq_select_external='select(.properties | map( .key == "sd.public.comment" and .value.internal == false ) | any) | .id'
  
  curl -XGET -H "Accept: application/json" -u "$username:$password" "$issue_url" | jq "$jq_remove_null_properties" | jq "$jq_select_external"
}

jql='"jql": "project = TIC"'
fields='"fields": ["issuekey", "issuetype", "status", "summary", "customfield_10922", "created", "resolutiondate", "customfield_11300", "customfield_10921", "customfield_11100", "description", "customfield_10935", "customfield_10932", "customfield_11001", "comment"]'
data="{$jql, $fields}"

searchurl="$baseurl/search"

jq_remove_null=".issues[] | select(.fields.customfield_11100 != null)"
jq_select_ac='select(.fields.customfield_11100 | map( test("^affected_customer")) | any)'

tmpfile="/tmp/tickets.json"

curl -X POST -H "Content-Type: application/json" -u "$username:$password" -d "$data" "$searchurl" | jq "$jq_remove_null" | jq "$jq_select_ac" | jq -s "." > "$tmpfile"

issue_ids=$(jq ".[].id | tonumber" "$tmpfile")

all_comment_ids=()

for id in $issue_ids; do
  cids=$(external_comment_ids "$id")
  for cid in $cids; do
    all_comment_ids+=("$cid")
  done
done

outfile="$output/tickets.json"

comment_ids=$(join_arr , "${all_comment_ids[@]}")
jq_remove_internal_comments=".[].fields.comment.comments |= select( [.[].id] | inside([${comment_ids}]) )"

jq "$jq_remove_internal_comments" "$tmpfile" > "$outfile"
