var result = `/*面试官你好，我叫xxx
 *这是我的一个会动的简历项目
 *xxxx
*/
* { 
  transition:all 1s;
}
html {
     background:rbg(255,255,255,0);
     font-size:16px;
}
/*接下来给代码加点高亮*/
.token.selector{
    color:#690;
}
.token.punctuation{
    color:#DD4A68;
}
.token.property{
    color:#905;
}
#code{
    border:1px solid red;
    padding:16px;
}
/*接下来需要一张纸来介绍自己*/        
`
var result2=`#code-wrapper {
width:50%;
left:0;
position:fixed;
height:100%;
}
#paper>.content {
display:block;
}
/*接下来在右边的白纸上书写一些自我介绍*/
`
var result3 = `/* 接下来用一个库marked.js
*把md转换为HTML
*/



/*
*谢谢观看
*/
`
var md = `
# 自我介绍

- 我叫 杨杰

- 1996年6月出生

- 中南林业科技大学毕业计算机与信息工程学院专业2018级毕业生

- 目前自学前端半年

- 希望应聘贵司的前端开发岗位

# 技能介绍

- HTML，CSS，JavaScript

- jQuery

- Vue

# 项目介绍

- 1.无缝轮播

- 2.会动的简历

- 3.自制小画板

# 联系方式
- QQ：1442122744

- email：1442122744@qq.com

- 手机：1570074xxxx
`

writeCode('',result,()=>{
                creatPaper(()=>{
                    writeCode(result,result2,writetMd(md,()=>{
                        writeCode(result+result2,result3,makeMdBecomeHtml(md))
                    }))
                })
            })
                        
/* 把字符串css写到#code和style中*/ 
function writeCode(precontent,code,fn){
    let domCode= document.getElementById('code')
    domCode.innerHTML=precontent||''
    let n=0
    let id = setInterval(()=>{
         n+=1
       domCode.innerHTML = 
       Prism.highlight(precontent+code.substring(0,n), Prism.languages.css, 'css')
       cssCode.innerHTML=precontent+code.substring(0,n)
       domCode.scrollTop=domCode.scrollHeight
       if(n>=code.length){
           clearInterval(id)
           fn && fn.call()
       }
     },35)
}      


function creatPaper(fn){
               let paper = document.createElement('div')
               paper.id='paper'
               let content = document.createElement('pre')
               content.className='content'
               paper.appendChild(content)
               document.body.appendChild(paper)
               fn && fn.call()
}

function writetMd(md,fn){
    let mdContent = document.querySelector('#paper>.content')
    let n=0
    let id =setInterval(()=>{
        n+=1
        mdContent.innerHTML=md.substring(0,n)
        mdContent.scrollTop=mdContent.scrollHeight
        if(n>md.length){
            clearInterval(id)
            fn&&fn.call()
        }
    },35)
}

function makeMdBecomeHtml(md,fn){
    var div = document.createElement('div')
    div.className='html markdown-body'
    div.innerHTML=marked(md)
    let markdownContainer = document.querySelector('#paper >pre.content')
    markdownContainer.replaceWith(div)
    fn&&fn.call()
}
