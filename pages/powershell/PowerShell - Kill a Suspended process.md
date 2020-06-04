---
title: PowerShell - Kill a Suspended Process on Windows
excerpt: "Killing a Windows process based on it's status"
date: 2020-01-09
tags: ["Powershell"]
keywords: "killing a suspended process on windows"
sidebar: auto
---

# Kill a Suspended Process on Windows

<br>
<hr>
<br>

The powershell cmdlet **get-process\*** does not give you the option to query for processes that are in a specific state.
I needed to kill suspended chrome instance left behind by puppetteer ( the web automation library)

```powershell
# Get the pids for all open chrome isntances
$chromeProcesses = (Get-Process chrome).Id

# Loop through each
$chromeProcesses | ForEach-Object {
    # assign the id for later use
    $processId = $_
    # check its status by calling into the .Net Diagnostics namespace.
    $process=[System.Diagnostics.Process]::GetProcessById($_)
    $threads=$process.Threads
    foreach($thread in $threads) {
        if($thread.WaitReason -eq 'Suspended') {
            # command to kill the process if it's status is suspended
            Get-Process chrome | Where-Object {$_.id -eq $processId} | kill -Force
        }
    }
}
```
