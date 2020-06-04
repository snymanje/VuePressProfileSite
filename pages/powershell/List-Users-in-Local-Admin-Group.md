---
title: List all users in local Administrators Group
excerpt: "The script utilises WMI and powershell to query and return all the members of the local 'Administrators' group on a remote machine in json format."
date: 2019-07-07
tags: ["Powershell"]
keywords: "powershell, Windows Server, Local Administrators"
sidebar: auto
---

# List all users in local Administrators Group

<br>
<hr>
<br>
The script utilises WMI and powershell to query and return all the members of the local "Administrators" group on a remote machine in json format.
The script can also be amended to enumerate any other groups on a remote machine for querying members
Usage: get-localadmin "Server Name"
 
Example: Get-LocalAdmin myservername

```powershell
function get-localadmin {
    param($strcomputer)
        $admins = Get - WmiObject win32_groupuser –computer $strcomputer
        $admins = $admins | Where - Object { $_.groupcomponent –like '*"Administrators"' }

        $admins | ForEach - Object { $_.partcomponent –match “.+Domain\=(.+) \, Name\=(.+)$” > $nul
        $matches[1].trim('"') + “\” + $matches[2].trim('"')
    }
}

get - localadmin { yourservernamehere } | ConvertTo - Json
```

Thanks for reading!
