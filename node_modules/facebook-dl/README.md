<p align="center">
  <a href="https://www.facebook.com/" rel="noopener">
 <img width=300px src="https://i.ibb.co/SDT4Ks9W/facebook-76536-1280.png" alt="Hiru News Loho"></a>
</p>

<h2 align="center">Facebook Video Download</h2>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/OminduDissanayaka/facebook-dl.svg)](https://github.com/OminduDissanayaka/facebook-dl/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/OminduDissanayaka/facebook-dl.svg)](https://github.com/OminduDissanayaka/facebook-dl/pulls)
[![License](https://img.shields.io/badge/license-GNU-blue.svg)](/LICENSE)

</div>

---

<p align="center"> The NPM for Facebook Video Downloader.

</p>


## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing


```sh
yarn add facebook-dl
```

or

```sh
npm i facebook-dl
```

## 🎈 Usage <a name="usage"></a>

```ts
const Facebook =  require("facebook-dl");

const api = new Facebook();
```
## Download Video
```ts
const videoInfo = await api.fbdl("https://web.facebook.com/share/r/1FTb2XA8SB/");
console.log(videoInfo);
```


```ts
{
  code: 200,
  code_creator: {
    name: 'Omindu_Dissanayaka',
    github: '@OminduDissanayaka',
    group: 'CybeRex'
  },
  results: {
    title: 'Facebook',
    thumbnail: 'https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t15.5256-10/455258170_851107816625914_5329062214009062644_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&ccb=1-7&_nc_sid=83a10b&_nc_ohc=VDFj7V85TkMQ7kNvgHORiGf&_nc_oc=AdgCRomBKHksBXjKc-Oz4TAa7kqj-NVJhXAyocSivnbS7HUjaXB5klLRPnHLQ9Uy2x0&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&_nc_gid=A_fTrEcefl8ls1zPhrLcBCm&oh=00_AYAlnrRnNa8bp4iqqNS7i7zPwQVfq_M973O0NNLf8WSHwg&oe=67CBA628',
    url: 'https://web.facebook.com/share/r/1FTb2XA8SB/',
    duration: '0:0:10',
    quality: {
      sd: 'https://z-p3-video.fcmb9-1.fna.fbcdn.net/o1/v/t2/f2/m69/AQPg-GdY_mwDd0dJXy0OrK071fkM5sC-8KI4gfX4-twPlepvwy22b0XsdvU7MwYiLPbVSU6U9vwrFUFWlzfPvFll.mp4?strext=1&_nc_cat=108&_nc_oc=AdgCwOp8-7pPTnFjRgiIqeNc3gNcuGAEt4U7L5DRPqCPEwA0Ml3vQ0dOldJcDmLPVHU&_nc_sid=8bf8fe&_nc_ht=z-p3-video.fcmb9-1.fna.fbcdn.net&_nc_ohc=KkjjFbrX5RYQ7kNvgEjZM7h&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5GQUNFQk9PSy4uQzMuMzYwLnN2ZV9zZCIsInhwdl9hc3NldF9pZCI6MTA1NTQ0OTU0NjI1NDc2NCwidXJsZ2VuX3NvdXJjZSI6Ind3dyJ9&ccb=17-1&_nc_zt=28&oh=00_AYBkdb4C-90akuu_o0xZ6dHCWs-1LUHn-QztuhKru6DstA&oe=67CBA4AA',
      hd: 'https://z-p3-video.fcmb9-1.fna.fbcdn.net/o1/v/t2/f2/m69/AQOy4GM5ZZqrhHyc881fpDgzXh1Tl5olFpOoQL6D5dEqfdqrdu2U2ees9BABdjQEgyHfam0OUqhoC610DWKwSNA4.mp4?efg=eyJ4cHZfYXNzZXRfaWQiOjEwNTU0NDk1NDYyNTQ3NjQsInZlbmNvZGVfdGFnIjoieHB2X3Byb2dyZXNzaXZlLkZBQ0VCT09LLi5DMy43MjAuZGFzaF9oMjY0LWJhc2ljLWdlbjJfNzIwcCJ9&_nc_ht=z-p3-video.fcmb9-1.fna.fbcdn.net&_nc_cat=105&strext=1&vs=61a08e7c14a128f5&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HS3FtWVJ5aTQ1YmJRU2dDQUh3RUlWcjNXMDBrYm1kakFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dDbi1JQnNaYTVrZUZGVU5BTVF1WC1pVGZZbEdidjRHQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJtimw_Sf-98DFQIoAkMzLBdAJbtkWhysCBgZZGFzaF9oMjY0LWJhc2ljLWdlbjJfNzIwcBEAdQIA&ccb=9-4&oh=00_AYBZmdzCqA0As9qdgCTejpuiqUbqmEw9cmP3Y74zj3T4vA&oe=67C7AA85&_nc_sid=1d576d&_nc_zt=28'
    }
  }
}
```
## ✍️ Authors <a name = "authors"></a>

- [@OmiduDissanayaka](https://github.com/OminduDissanayaka/facebook-dl) - Facebook Download Unofficial project author