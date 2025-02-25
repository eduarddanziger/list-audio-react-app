#!/bin/bash

# Variables
CODESPACE_NAME="CodeSpaceMain"
# PAT=""
OWNER="eduarddanziger"          # Replace with your GitHub username or organization name
REPO="list-audio-react-app"                 # Replace with your repository name (if applicable)
GITHUB_API_URL="https://api.github.com"

# Headers for API requests
HEADERS=(
    "-H" "Authorization: token $PAT"
    "-H" "Accept: application/vnd.github+json"
)

# Function to check Codespace status
function get_codespace_status {
    local url="$GITHUB_API_URL/user/codespaces"
    local response
    response=$(curl -s "${HEADERS[@]}" "$url")

    # Check if the response contains Codespaces
    if echo "$response" | jq -e '.codespaces == null or .codespaces == []' > /dev/null; then
        echo "No Codespaces found."
        exit 1
    fi

    # Extract the status of the specified Codespace
    local state
    state=$(echo "$response" | jq -r --arg NAME "$CODESPACE_NAME" '.codespaces[] | select(.display_name == $NAME) | .state')

    if [ -z "$state" ]; then
        echo "Codespace '$CODESPACE_NAME' not found."
        exit 1
    fi

    echo "$state"
}

# Function to check Codespace status
function get_codespace_name {
    local url="$GITHUB_API_URL/user/codespaces"
    local response
    response=$(curl -s "${HEADERS[@]}" "$url")

    # Extract the status of the specified Codespace
    local cname
    cname=$(echo "$response" | jq -r --arg NAME "$CODESPACE_NAME" '.codespaces[] | select(.display_name == $NAME) | .name')

    echo "$cname"
}



# Function to start Codespace
function start_codespace {
    local cname
    cname=$(get_codespace_name)
    
    local url="$GITHUB_API_URL/user/codespaces/$cname/start"
    curl -X POST "${HEADERS[@]}" "$url"
}

# Main script
echo "Checking status of Codespace: $CODESPACE_NAME..."

status=$(get_codespace_status)
if [ $? -ne 0 ]; then
    echo "Failed to check Codespace status."
    exit 1
fi

echo "Codespace status: $status"

# Start Codespace if stopped
if [ "$status" != "Available" ]; then
    echo "Codespace is stopped. Starting..."
    start_codespace
    echo "Codespace started."
else
    echo "Codespace is already running."
fi