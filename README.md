# lsp-debug-web


> 使用 codemirror 调试lsp

- 启动项目

```
npm install
npm run dev
```


http://localhost:8080/


- 备注

gopls当前存在bug

发送的 initialized 消息的参数是null的时候gopls会陷入初始化异常
发送null是负荷jsonrpc的规范的,gopls没有正确处理
参考 issue : https://github.com/golang/go/issues/57459
当前处理办法:使用webpack替换打包后的代码