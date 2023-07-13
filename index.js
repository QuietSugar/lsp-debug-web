import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/go/go";
import "codemirror/mode/python/python";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/idea.css";
// This addon is required to be installed by the caller
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";

import "lsp-editor-adapter/lib/codemirror-lsp.css";
import { LspWsConnection, CodeMirrorAdapter } from "lsp-editor-adapter";

import golangCode from "./example-code/go.code";

let sample = "sample";

// 不同语言的配置信息
let languageMap = {
  golang: {
    wsServer: "ws://172.16.21.94:9999/",
    lspWsServer: "ws://172.16.21.94:9999/", //这个变量可能比 wsServer 多一个后缀
    mode: "golang",
    value: golangCode,
  },
  html: "file.html",
  css: "file.css",
};

let editor = CodeMirror(document.querySelector(".editor"), {
  theme: "idea",
  lineNumbers: true,
  value: sample,
  gutters: ["CodeMirror-lsp"],
});

// 监听下拉选项
document.querySelector("select").addEventListener("change", () => {
  switchSources();
});

let connection;
let adapter;
function switchSources() {
  // 清理资源
  if (connection) {
    connection.close();
  }
  if (adapter) {
    adapter.remove();
  }
  // 获取当前选中的
  let value = document.querySelector("select").value.toLowerCase();
  console.log("当前选中的是" + value);
  let languageOpt = languageMap[value];
  console.log(   languageOpt);
  if (languageOpt === undefined) {
    alert("选项错误!");
    console.log("选项错误:---...." + languageOpt);
    return;
  }
  editor.setOption("mode", languageOpt.mode);
  editor.setValue(languageOpt.value);

  connection = new LspWsConnection({
    serverUri: languageOpt.lspWsServer,
    languageId: "go",
    rootUri: "source://admin/default/package_example/",
    documentUri: "source://admin/default/package_example/main_file.go",
    documentText: () => editor.getValue(),
  });

  connection.connect(new WebSocket(languageOpt.wsServer));

  adapter = new CodeMirrorAdapter(
    connection,
    { quickSuggestionsDelay: 100 },
    editor
  );

  // // You can also provide your own hooks:
  // connection.on('error', (e) => {
  //   console.error(e)
  // });
}

switchSources();
