const playBut = document.querySelector("#play")
const myAudio = document.querySelector("#myAudio")
const controlDom = document.querySelector("#control")
const infoBar = document.querySelector("#info")
const barContainer = document.querySelector(".progress-bar")
const bar = document.querySelector(".bar")
const song = document.querySelector("#song")
const name = document.querySelector("#name")
const alarm = document.querySelector(".alarm")
const source = document.querySelector("#myAudioSource")
const timeSpan = document.querySelector('#time')
const play1 = document.querySelector('#play1')
const play2 = document.querySelector('#play2')
const lyricDom = document.querySelector("#lyric")
let lyricText = null
playBut.addEventListener("click", playF)
let billboard = "热歌榜"

let time = null
const songs = []
let Current = 0

function playF() {
  let flag = Array.from(controlDom.classList).some(function (item) {
    return item === "active"
  })
  if (flag) {
    controlDom.classList.remove("active")
    // infoBar.classList.remove("active")
    alarm.classList.remove("active")
    myAudio.pause()
    play1.style.display = "block"
    play2.style.display = 'none'
    clearInterval(time)
  } else {
    controlDom.classList.add("active")
    // infoBar.classList.add("active")
    alarm.classList.add("active")
    myAudio.play()
    play1.style.display = "none"
    play2.style.display = "block"
    // 更新bar宽度
    time = setInterval(() => {
      // console.log(wid)
      update(myAudio.currentTime, myAudio.duration)
    }, 900)
  }
}

/* 秒转分:秒 */
function sec2Min(num) {
  let m = Math.floor(num / 60)
  let s = Math.floor(num % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/* 更新页面信息 */
function update(current, duration) {
  timeSpan.innerText = `${sec2Min(current)}/${sec2Min(duration)}`
  let wid = current / duration * 100
  bar.style.width = wid + "%"
  let arr = Array.from(Object.keys(lyricText))
  // console.log(lyricText);
  // console.log(current);
  let key = null
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= Math.ceil(current)) {
      key = arr[i - 1] || '-1'
      break;
    }
  }
  // console.log(key);
  lyricText['-1'] = `${song.innerText}`
  // console.log(key);
  key = key || '-1'
  lyricDom.innerText = " " + lyricText[key]
}

myAudio.addEventListener("ended", function () {
  nextSong()
})


function getSongUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

/* 获取歌词 */
async function getSongLyric(id) {
  try {
    let ajax = await fetch(`https://netease-cloud-music-njd5bd96c-jiankang-li.vercel.app/lyric?id=${id}`)
    let result = await ajax.json()
    let lyric = result.lrc.lyric
    // console.log(lyric);
    return lyric
  } catch (e) {
    console.log("getLyric", e);
  }
}

function getID(url) {
  let id = /id=\d*/.exec(url)[0].split('=')[1]
  // console.log(id);
  return id
}

/* 获取歌曲 */
async function getSong() {
  try {
    let url = `https://api.uomg.com/api/rand.music?sort=${billboard}&format=json`
    let res = await fetch(url)
    let result = await res.json()
    let CS = null
    CS = result.data
    let oldUrl = CS.url
    CS.url = oldUrl + '.mp3'
    // console.log(result.songs)
    // let songList = result.songs
    // songList.forEach(ele => {
    //   songs.push({
    //     name: ele.name,
    //     picurl: ele.al.picUrl,
    //     artistsname: ele.ar[0].name,
    //     url: getSongUrl(ele.id),
    //   })
    // });
    // 获取歌词
    let id = getID(oldUrl)
    let lyrictext = await getSongLyric(id)
    lyrictext = lyrictext.trim().split('\n')
    let lyricObj = {}
    lyrictext.forEach((item) => {
      let arr = item.split(']')
      arr[0] = arr[0].replace('[', '')
      let arr2 = arr[0].split(":")
      let m = parseInt(arr2[0])
      let s = parseFloat(arr2[1])
      let time = m * 60 + s
      lyricObj[time] = arr[1]
    })
    // console.log(lyricObj);
    CS.lyric = lyricObj
    // console.log(CS);
    songs.push(CS)

    // console.log(songs)
  } catch (e) {
    console.log("getSong1" + e)
  }
}

/* 下一首 */
async function nextSong() {
  if (Current < songs.length - 1) {
    Current = Current + 1;
    PlaySong()
  } else if (Current === songs.length - 1) {
    //  alert("到歌单底部了，将自动重头开始")
    //  Current = 0
    await getSong()
    Current = Current + 1
    PlaySong()
  }
  // console.log(songs);
}

/* 上一首 */
function prevSong() {
  if (Current === 0) {
    alert("已经到歌单头部了哟！")
    return;
  }
  Current = Current - 1;
  PlaySong()
}


function getSession() {
  if ('mediaSession' in navigator) {
    let  ms = navigator.mediaSession
  
    ms.setActionHandler('play', function () {
      myAudio.play()
    });
    ms.setActionHandler('nexttrack', function ()  {
      nextSong()
    });
    ms.setActionHandler('previoustrack', function () {
      prevSong()
    });
    ms.setActionHandler('pause', function() { 
      myAudio.pause()
    });

    window.ms = ms
  }
}

function PlaySong() {
  let CurrentSong = songs[Current]
  // let CurrentSong = CS
  // console.log(CS);
  let pic = CurrentSong.picurl;
  name.innerText = CurrentSong.artistsname
  song.innerText = CurrentSong.name
  let flag = Array.from(controlDom.classList).some(function (item) {
    return item === "active"
  })
  myAudio.src = CurrentSong.url
  alarm.style["background"] = `url(${pic}) no-repeat center center`
  alarm.style["background-size"] = `cover`
  lyricText = CurrentSong.lyric
  const list = [96, 128, 256, 384, 512]
  const arr = []
  list.forEach(item => {
    arr.push({
      src: CurrentSong.picurl,
      sizes: `${item}x${item}`,
      type: 'image/png'
    })
  })
  window.ms.metadata = new MediaMetadata({
    title: CurrentSong.name,
    artist: CurrentSong.artistsname,
    album: '每天都要开心哟😉!',
    artwork: arr
  });
  if (flag) {
    myAudio.play()
    setTimeout(()=>{
      if(Number.isNaN(myAudio.duration)) {
        nextSong()
      }
    }, 1000)
  }

}

// 初始化
getSong().then(res => {
  PlaySong()
}, err => {
  console.log("getSong", err)
})

myAudio.addEventListener('loadeddata', function () {
  if (myAudio.readyState >= 2) {
    update(myAudio.currentTime, myAudio.duration)
  }
});

// 歌单选择
const billboards = ["热歌榜", "新歌榜", "飙升榜", "抖音榜", "电音榜"]
function select(e) {
  const num = parseInt(e.target.value)
  billboard = billboards[num]
  // console.log(billboard);
}

const radios = document.querySelector(".radios")
radios.addEventListener('click', (e) => {
  select(e)
})

barContainer.addEventListener('click', (e) => {
  // console.log(e.offsetX);
  let ewidth = e.offsetX
  let barwidth = barContainer.getBoundingClientRect().width
  let percent = (ewidth / barwidth)
  let currentTime = percent * Math.floor(myAudio.duration)
  myAudio.currentTime = currentTime
  update(currentTime, myAudio.duration)
})

getSession()

window.addEventListener('unhandledrejection', function (event) {
  let txt = ''
  txt += "原因" + event.reason //获取到catch的err的原因(内容) 与控制台报错一致
  txt += "promise" + event.promise //获取到未处理的promise对象
  console.log(txt);
})