---
title: RedHat OpenShift Notes
excerpt: "Red Hat OpenShift for Beginners"
date: 2020-01-12
tags: ["OpenShift"]
keywords: "RedHat OpenShift, Containers"
cover_image: ""
---

# RedHat OpenShift for Beginners

<br>
<hr>
<br>

Openshift is RedHat's open source container application platform for developing and hosting enterprise grade applications.  
Openshift is RedHat's platform as a service offering. once deployed Openshift takes care of managing the underlying infrastructure components thereby enabling the developers to do what they do best - Code.

Openshift has four different flavors namely,

- the **_Openshift_** Origin which is the original upstream open source project from which all other models are derived.
- The **_Openshift Online_** is RedHat's publicly hosted version of Openshift origin available for application development and hosting purposes.
- **_Openshift dedicated_** is a managed private cluster on cloud platforms like AWS and Google and Openshift.
- **_Enterprise_** is the On Premise private Paas offering of Openshift. Mostly in the duration of this course.

<br>

![Origin](/assets/images/OpenShift/Origin.png)

![componentsOverview](/assets/images/OpenShift/componentsOverview.png)

Openshift adds support for developer tools such as built in integration with source code management softwares like Github.  
Openshift has built in integration with build pipelines that helps developers rapidly and consistently develop, build, test and deploy applications.  
Openshift helps manage Docker images of your application by providing a built in registry.
Openshift comes with support for software defined network that provides networking capabilities out of the box.  
Openshift is API centric and has a rich and well-documented set of API's that helps us easily integrate Openshift with our existing infrastructure.  
And last but not least Openshift provides out of the box support for projects teams and users to organize and manage access to applications.
![tools](/assets/images/OpenShift/tools.png)

<br>

## OpenShift Architecture

<br>

Openshift leverages Kubernetes underneath as the primary infrastructure component.  
We learned that on Kubernetes you can deploy applications in the form of containers such as Docker containers.

Containers are created from images of applications. But where do these Docker images come from?  
You may configure Openshift to pull these images from a public Docker repository or registry like Docker Hub as we saw in the Docker basics lecture.

Alternatively you may use the Openshift container registry that comes built in with Openshift Origin a collection of one or more containers together for a pod and multiple pods form a deployment.

We use services to expose the deployments to other applications or to the external world. These as we
learned are basic Kubernetes constructs that Openshift leverages to manage all of these with ease.

Openshift comes with a built in web console that developers can access to browse and manage their applications.  
This web console can only be accessed by users which are managed by Openshifts authentication and authorization mechanisms.

Users can create projects to group together and manage various components of their applications.

Openshift Also comes with built-in integration to source code management systems through which users can import their application code. The code repository has integration with built in CI/CD pipelines where the application code is built into Docker images and pushed to the built-in container registry.

At the heart of Openshift lies the ETCD Key value store that stores information about various components.  
The components you see on the right are built in Kubermetes constructs that Openshift leverages, whereas the ones on the left are a few among the many add ons by Openshift.
![ArchitectureOverview](/assets/images/OpenShift/ArchitectureOverview.png)

The underlying Kubernetes cluster is configured with multiple nodes or minions where the actual Docker images are hosted.  
These nodes are managed by one or more master nodes. The master nodes host the API server, the ETCD data store and the scheduler.
![masterNodes](/assets/images/OpenShift/masterNodes.png)

<br>

## Management Tools

<br>

![managementTools](/assets/images/OpenShift/managementTools.png)

![WebConsole](/assets/images/OpenShift/WebConsole.png)

![clis](/assets/images/OpenShift/cli.png)

![apis](/assets/images/OpenShift/api.png)

<br>

## Projects and Users

<br>

### Projects

- A project in Openshift allows users to organize and manage their contents in the Openshift environment.
- It helps teams isolate their work from other teams sharing the same infrastructure.
- It allows us to manage access to resources for various users.
- Projects are built on top of Kubernetes constructs known as namespaces. Using namespaces Kubernetes automatically prefixes a name of your choice to the objects you create in your namespace, thereby providing some basic grouping functionality for resources.
- Openshift projects builds on this functionality to provide complete grouping and isolation of resources that is seamless to users. The user simply creates a project and deploys the application and no longer worry about managing namespace underneath. All of that is taken care of by Openshift automatically.

<br>

![projects](/assets/images/OpenShift/projects.png)

### Users

Openshift comes with built-in user management features.  
There are three types of users available-Regular **_User, System User and Service accounts_**.

Regular users are developers and others who interact with Openshift for developing and deploying applications on a regular basis.  
They go simply by the name of the users, such as developer.

System users are used for interacting with the infrastructure such as Cluster Administrator or a user created for each node in the cluster.  
OpenShift create some of these users by default such as the system admin and system master users.  
Note that system users can be identified by a system prefix on the user names.

The third type is service accounts which can be created as needed for each project.  
These user accounts are for enabling communication between various services within our application.  
For example an account used by the web server for accessing the database. Service accounts have a prefix of system service account on the user names.

Openshift master includes a built in OAuth server that is responsible for authenticating and authorizing users into the Openshift cluster.

![users](/assets/images/OpenShift/users.png)

<br>

## Builds and Deployments

<br>

Openshift has built in integration to source code management tools hosted internally or externally such as GitHub, GitLab and Bitbucket etc..  
So you must have your application code uploaded to a source code repository in order to deploy it on open shift.  
When you try to add the application to a project in Openshift specify the location of the source code repository in the Git Repository field.

![sourceCode](/assets/images/OpenShift/sourceCode.png)

When you add an application to a project Openshift automatically creates a build job for the application using the you URL the code repository specified in the previous step.  
When run, the Build downloads a copy of the code from the code repository and builds the code using a predefined Build configuration into a Docker image.  
The Docker image is then pushed to the built in Docker registry.

![build](/assets/images/OpenShift/build.png)

Openshift also creates a deployment automatically. On a successful build the deployment deploys the application using the image from the internal Docker registry to the built-in Kubernetes cluster making the application available to the end users. Deployments in Openshift are similar to the concept of deployments in Kubernetis.

![deployments](/assets/images/OpenShift/deployments.png)
<br>
<br>

## Build triggers

We would like the Builds to trigger automatically when we make a change to our application code. For that to happen, Openshift needs to know whenever a change is made to the code.

So when a developer updates the code. The code repository needs to send a message to Openshift notifying it of the new events.  
On receiving this notification. Openshift will automatically trigger a new build where it pulls the code and builds a Docker image out of it and then deploy the new version of the application to make the changes accessible to users.

Once this is set up every time a developer makes a change to the application code, it is automatically built and deployed in the target environment without any manual intervention.

The source code repository sents this message to OpenShift via a Webhook.

![BuildTriggers](/assets/images/OpenShift/BuildTriggers.png)

<br>

## Services and Routes

<br>

Services help connect different applications or group of pods with one another instead of relying on the IP address or DNS name of a Pod.

It is recommended to use a Service, as a Service acts as a load balancer for each section of our micro-services architecture. In this case the front end talks to the backend through a Service.  
The backend talks do a data processing application through a Service.

The front end can expose our application to the end users again through a Service and in case we need access to external data stores,again it's accomplished with the help of Services. Services provides us with the flexibility of modifying and re-deploying the underlying Microservices, without having to worry about modifying configuration of other dependent applications.  
Each service within Openshift gets its own IP address and DNS entries that can be used to establish connectivity from other applications.

![services](/assets/images/OpenShift/services.png)

A Route helps us expose the service to external users through a hostname.  
Think of a route as a proxy server such as HAProxy or F5.

You can configure load balancing, security as well as split traffic between services with routes.  
The route is responsible for balancing load across the different pods within the deployment. In order to do that it relies on different load balancing strategies such as roundrobin, leastconn and source.

Source is the default strategy used.  
The Source strategy looks at the IP address of the user accessing the application and makes sure that user is always directed to the same back and server for the duration of that session thus providing a sticky session functionality.

The second routing strategy is the Roundrobin in this case.  
Each request is directed to a separate backend each time even if the requests originate from the same user IP address.

The third routing strategy routes traffic to the endpoint with the lowest number of connections.
![routes](/assets/images/OpenShift/routes.png)

<br>

## Storage

<br>

Docker containers are meant to be transients in nature which means they are meant to last only for a short period of time.  
They are called upon when required to process data and destroyed once finished. The same is true for the data within the container.  
The data is destroyed along with the container.

To persist data processed by the containers we attach a persistent volume to the containers when they are created.  
The data processed by the container is now placed in this volume thereby retaining it permanently.
![PersistantVolumes](/assets/images/OpenShift/PersistantVolumes.png)

Openshift leverages the Kubernetes persistent volume framework to provision storage for a cluster. Storage can be provisioned to an
Openshift cluster using any of the Plugins listed here such as Local, iSCSI, Fiber Channel, NFS or from a variety of supported platforms such as **_GlusterFS, Ceph RDB, OpenStacks Cinder, AWS Elastic Blocks Store, Azure Disk, Azure File or VMWare vSphere_**.

The Storage added to the Openshift cluster is available across the cluster as a single large pool of persistent volume resources.  
From these each project can claim the required amount of storage using persistent volume claims.

This storage can then be used as persistent storage within the pods in each project.
![storagePlugins](/assets/images/OpenShift/storagePlugins.png)

To create Storage, click on the create Storage button in the web console fill in the name of the Storage claim and update the access mode.
![createstorage](/assets/images/OpenShift/createstorage.png)

Single user mode allows the volume to be mounted as read right by a single node only the shared access mode allows volume to be mounted by multiple nodes for read write access and read only mode allows the volume to be mounted by multiple nodes but read only once the access mode is selected.

Add a size to create a persistent volume claim. The created Storage can now be attached to Pods by adding a volume to the Deployment configuration.
![createstoragedetails](/assets/images/OpenShift/createstoragedetails.png)
