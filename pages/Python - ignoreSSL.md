---
title: Python - pip install SSL certificate error
excerpt: "Ignoring SSL Certificate error when installing packages"
date: 2020-02-05
tags: ["python"]
keywords: "pip install certificate error"
cover_image: ""
---

# Python - pip install SSL certificate error
<br>
<hr>
<br>

## How to ignore the SSL Certificate errors
<br>

When you see an error like this, it's most likely that you are behind a proxy server (or something else).
```batch
Could not fetch URL https://pypi.org/simple/pip/:  
There was a problem confirming the ssl certificate: HTTPSConnectionPool(host='pypi.org', port=443):  
Max retries exceeded with url:  
/simple/pip/ (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED]  
certificate verify failed: self signed certificate in certificate chain (_ssl.c:1108)'))) - skipping
```
<br>

Add the ***--trusted-host pypi.org*** and ***--trusted-host files.pythonhosted.org*** to the pip install command.
```batch
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org <package_name>
```