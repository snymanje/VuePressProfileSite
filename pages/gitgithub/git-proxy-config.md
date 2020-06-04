---
title: Adding proxy settings to your git config
excerpt: "When you are behind a proxy server you might have to configure your proxy settings in .gitconfig"
date: 2019-08-13
tags: ["Git"]
keywords: "git proxy"
sidebar: auto
---

# Edit the .gitconfig file

<br>
<hr>
<br>

On windows this can be located in %userprofile%.  
Add the following to the file.

```
[http]
    proxy = http://my.proxy.net:8080
[https]
    proxy = http://my.proxy.net:8443
[http "http://no-proxy-server"]
    proxy = ""
```
