# Variables
$CODESPACE_NAME = "CodeSpaceMain"
$PAT = "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"
$GITHUB_API_URL = "https://api.github.com"

# Headers for API requests
$headers = @{
    "Authorization" = "token $PAT"
    "Accept" = "application/vnd.github+json"
}

# Function to check Codespace status
function Get-CodespaceStatus {
    $url = "$GITHUB_API_URL/user/codespaces"
    $response = Invoke-RestMethod -Uri $url -Headers $headers -Method Get
    $codespace = $response.codespaces | Where-Object { $_.name -eq $CODESPACE_NAME }
    return $codespace.state
}

# Function to start Codespace
function Start-Codespace {
    $url = "$GITHUB_API_URL/user/codespaces/$CODESPACE_NAME/start"
    Invoke-RestMethod -Uri $url -Headers $headers -Method Post
}

# Main script
try {
    # Check Codespace status
    Write-Host "Getting Codespace status..."
    $status = Get-CodespaceStatus
    Write-Host "...Codespace status: $status"

    # Start Codespace if stopped
    if ($status -eq "Stopped") {
        Write-Host "Codespace is stopped. Starting..."
        Start-Codespace
        Write-Host "...Codespace started."
    } else {
        Write-Host "Codespace is already running. Starting it again"
        Start-Codespace
        Write-Host "...Codespace started."
    }
} catch {
    Write-Host "An error occurred: $_"
}