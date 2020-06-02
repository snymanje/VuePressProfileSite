---
title: Invoke-RestMethod Self-Signed Certificate Errors
excerpt: "If you use Invoke-RestMethod or Invoke-WebRequest you might have come across these errors when calling api endpoints."
date: 2019-07-25
tags: ["Powershell"]
keywords: "powershell, web scraping"
cover_image: ""
---

# Using Invoke-WebRequest or Invoke-RestMethod against a server using a Self-Signed Certificate.
<br>
<hr>
<br> 
  
The first error you might get is this undescriptive one  

```powershell
Invoke-RestMethod : The underlying connection was closed: An unexpected error occurred on a send.
```

Run this to check the default TLS version. 
```powershell
[System.Net.ServicePointManager]::SecurityProtocol
```

If its not Tls12, add this line to the top of your powershell script.
```powershell
[System.Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
```

When you now rerun your script you might get this error,
```powershell
Invoke-RestMethod : The underlying connection was closed: Could not establish trust relationship for the SSL/TLS secure channel.
```

Basically we need to ignore the Self Signed Certificate from the destination endpoint.
We can do this by adding the below code after the previous line where we set the TLS version and before your code that calls the endpoint.
```powershell
if (-not ([System.Management.Automation.PSTypeName]'ServerCertificateValidationCallback').Type)
{
$certCallback = @"
    using System;
    using System.Net;
    using System.Net.Security;
    using System.Security.Cryptography.X509Certificates;
    public class ServerCertificateValidationCallback
    {
        public static void Ignore()
        {
            if(ServicePointManager.ServerCertificateValidationCallback ==null)
            {
                ServicePointManager.ServerCertificateValidationCallback += 
                    delegate
                    (
                        Object obj, 
                        X509Certificate certificate, 
                        X509Chain chain, 
                        SslPolicyErrors errors
                    )
                    {
                        return true;
                    };
            }
        }
    }
"@
    Add-Type $certCallback
 }
[ServerCertificateValidationCallback]::Ignore()
```  
That should be it.  

Let me know if this worked for you by leaving a comment.


