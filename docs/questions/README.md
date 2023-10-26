## Uncaught SyntaxError: Unexpected token ‘＜‘ 
### 问题原因：
 - js被nginx返回html解析的情况是在直接返回以下形式路由的时候出现的。访问了不存在的js，然后这个404错误又重新指向了一个提示的自定义页面，由于脚本里面不允许出现标签, 带了<>符号，所以，就会抛出这个异常 从而报错。

### 解决方法
 - 试试清楚缓缓
 - 在vue项目中引入静态资源，放在public文件夹里使用绝对路径本地运行是没问题的，打包后发布到正式环境却报此错误 Uncaught SyntaxError: Unexpected token ‘＜‘
   - 这样的问题一般都是我们在打包后引入的资源路径出错的问题
   - 我们可以在URL路径前面加上一个公共的路径，即我们的打包配置中publicpath的前缀  <%= BASE_URL %>
   - 或者只要把这里的 publicPath 设置为 "/" 就行，前面不要加点，改了之后问题就解决了。

## 在登录站点之后，关闭浏览器，重新打开，站点登录失败
项目的鉴权是通过gs的智能网关，在本地存储cookie,重新打开站点的时候有站点的缓存，所以没有走到智能网关，解决方式是清楚站点缓存。。。
怎么清楚站点缓存
```
<!-- 用于设定禁止浏览器从本地机的缓存中调阅页面内容 -->
<meta http-equiv="pragma" content="no-cache">
<!--  -->
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
<!-- Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。 -->
<meta http-equiv="Cache-Control" content="no-cache">
<!-- 可以用于设定网页的到期时间 -->
<meta http-equiv="expires" content="0">
```