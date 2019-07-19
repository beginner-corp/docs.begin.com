## Overview

Your `begin.app` URL is pretty nice, but it's probably not as good as that great domain you've been wanting to use with your app. We've got you covered!

Begin allows you to add your domain to your Begin app through a simple process called domain mapping (also sometimes called host mapping).

Once mapped, you can always swap out your app's domains at any time, or get rid of them entirely – your old `begin.app` URLs will always continue to work.


## Mapping your domain

Domain mapping follows a simple process, and should only take a few minutes to get set up:
1. Enter your `production` and `staging`
2. Verify your ownership of the domain(s) by creating some CNAME challenge records to your DNS provider
3. Map the domain to your Begin app in your DNS provider

It's a lot faster and easier than it sounds, let's get started!


## Enter `production` and `staging` domains

The first step in domain mapping is to enter the domains you'll be using.

Begin's first-class support for `staging` environments means you'll need to add a `staging` domain (or subdomain), too.

Say your domain is `www.zombo.com`. We'd suggest keeping it simple and setting your `staging` domain to `staging.zombo.com` – but you can also opt to configure it to be `zombostaging.net`, if you prefer.

In the next step, you'll enter the first two values in your DNS provider's interface, which will prove you own your domains and generate your SSL certificates.


## Generating SSL certificates

In this step, you'll need to add two CNAME values to your DNS provider in order to verify your ownership of the domain(s), and generate your SSL certificates for HTTPS.

During the SSL verification step, the first part of `name` gets entered as your CNAME subdomain, and the value is inputted as the value. For instance, when you're provided the following CNAME entry:

- Name: `_2f9b34277e4b159e0beaa859e8802a93.www.example.com`
- Value: `_58cb94c5d71976edd03e8303fc1a126b.acm-validations.aws.`

You'll add a CNAME subdomain of `_2f9b34277e4b159e0beaa859e8802a93` within your `example.com` zone, and set its value to `_58cb94c5d71976edd03e8303fc1a126b.acm-validations.aws.`.

Due to the eventually consistent nature of DNS-based verification, it may take a few minutes for your changes to get picked up. Check back after a few minutes, and your values should be green, and you should be able to complete the next and final step.

If for some reason after more than a few minutes your domains haven't verified, make sure that you've correctly entered the settings into your DNS.

Should you continue to have trouble, please don't hesitate to [reach out to support](https://begin.com/support).


## Domain mapping

In the final step, you'll add the final two CNAME (or [ALIAS](#mapping-naked-domains), if you're using naked domains) values to your DNS provider. This points your domain at your Begin app.

For instance, when you're provided the following CNAME entry:

- Name: `www.example.com.`
- Value: `pi1f6fddqd0dje.cloudfront.net`

You'll add a CNAME subdomain of `www` within your `example.com` zone, and set its value to `pi1f6fddqd0dje.cloudfront.net`.

> Note: Begin does not presently verify you have correctly completed this step, so you may want to use a service like [DNS Checker](https://dnschecker.org/) to validate your changes.


## Mapping naked domains

A naked domain (also referred to as a zone apex) is simply a domain set up to respond to requests without a subdomain. For example:

- `https://begin.com` is a web address using a naked domain
- `https://docs.begin.com` has a subdomain, and is thus not a naked domain

Begin supports mapping naked domains, but your current DNS provider needs to support it as well.

Specifically, your DNS provider requires the ability to add `ALIAS` records (also sometimes called `ANAME`, or `A ALIAS`), in order to create a mapped naked domain.

Here are a few DNS providers that we are aware of that support ALIAS records for mapping naked domains:

- [AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html)
- [ClouDNS](https://www.cloudns.net/wiki/article/18/)
- [DNS Made Easy](http://help.dnsmadeeasy.com/managed-dns/records/aname-records/)
- [DNSimple](https://support.dnsimple.com/articles/alias-record/)
- [Dyn](https://dyn.com/dns/managed-dns/alias/)
- [easyDNS](https://fusion.easydns.com/index.php?/Knowledgebase/Article/View/190/7/aname-records/)
- [NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-can-i-set-up-a-cname-record-for-my-domain)
- [NS1](https://ns1.com/knowledgebase/cname-alias-and-linked-records)
- [ZoneEdit](https://support.zoneedit.com/Knowledgebase/Article/View/1/1/root-domain-aliases-root-aliases-zone-apex-aliases-implemeneted-as-anames)

If you aren't using a provider that supports ALIAS records, or you aren't sure, we suggest using a subdomain (such as `www`) when mapping your Begin app's domain.


### Starting over

Something not looking right? No sweat, DNS can be finicky. If you need to hit the reset button, just click `Start over` (or, if you've finished mapping your domain, `Delete domain mapping`).

Your app will then be restored to its original `yourappname.begin.app` URLs, and you'll be able to re-map your domain again.
