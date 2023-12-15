# 在线编辑器
支持yaml，xml，json，lua等语法格式校验和报错提示
```vue
<template>
  <div ref="monacoEditor" id="monacoEditor" :style="style"></div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch, onBeforeUnmount } from "vue";
import * as monaco from "monaco-editor";
import luaparse from "luaparse";
import yaml from "js-yaml";
const props = defineProps({
  modelValue: {},
  style: {},
  readOnly: {},
  language: {},
  content: {},
});

const emit = defineEmits(["update:modelValue"]);

const monacoEditor = ref();
let editor;
let monaco_languages = monaco.languages.getLanguages();
let id = "plaintext"; // 默认纯文本

const init = async () => {
  console.log("monaco_languages", monaco_languages);
  monaco_languages.forEach((language) => {
    language.extensions &&
      language.extensions.forEach((ex) => {
        if (props.language == ex.slice(1)) {
          id = language.id;
        }
      });
  });

  /**
   * @param wordWrap 自动换行，注意大小写
   */
  editor = monaco.editor.create(monacoEditor.value, {
    automaticLayout: true,
    value: props.modelValue,
    readOnly: props.readOnly,
    theme: "vs-dark",
    language: id,
    wordWrap: "on",
    wrappingIndent: "indent",
  });
  // Set up the XML language
  monaco.languages.register({ id: "xml" });
  monaco.languages.setLanguageConfiguration("xml", {
    comments: {
      lineComment: "--",
      blockComment: ["--[[", "]]"],
    },
  });

  // Define the error checking function for XML
  const checkXMLSyntax = (code) => {
    let errorMessage, xmlDoc;
    // code for IE
    if (window.ActiveXObject) {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(xmlContent);

      if (xmlDoc.parseError.errorCode != 0) {
        console.log("xmlDoc.parseError", xmlDoc.parseError);
        errorMessage = "错误code: " + xmlDoc.parseError.errorCode + "\n";
        errorMessage = errorMessage + "错误原因: " + xmlDoc.parseError.reason;
        errorMessage = errorMessage + "错误位置: " + xmlDoc.parseError.line;
        return [
          {
            severity: monaco.MarkerSeverity.Error,
            message: errorMessage,
            startLineNumber: xmlDoc.parseError.line - 1,
            startColumn: 0,
            endLineNumber: xmlDoc.parseError.line - 1,
            endColumn: 1,
          },
        ];
      } else {
        return [];
      }
    } else if (document.implementation.createDocument) {
      const parser = new DOMParser();
      xmlDoc = parser.parseFromString(code, "text/xml");
      const error = xmlDoc.getElementsByTagName("parsererror");

      if (error.length > 0) {
        errorMessage = xmlDoc
          .getElementsByTagName("parsererror")[0]
          .getElementsByTagName("div")[0].innerText;
        let tmp = [];
        let keyRexExp = new RegExp("(line 0)", "gi");
        errorMessage.split(":").forEach(function (msg, index) {
          if (index == errorMessage.split(":").length - 1) {
            msg = msg.replace(keyRexExp, "");
            tmp.push(msg);
          } else {
            tmp.push(msg);
          }
        });

        errorMessage = tmp.join(":");
        let match = errorMessage.match(/line (\d+) at column (\d+)/);
        if (match) {
          let lineNumber = +match[1];
          let columnNumber = +match[2];
          return [
            {
              severity: monaco.MarkerSeverity.Error,
              message: errorMessage,
              startLineNumber: lineNumber - 1,
              startColumn: columnNumber,
              endLineNumber: lineNumber - 1,
              endColumn: columnNumber + 1,
            },
          ];
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  };

  // Set up the YAML language
  monaco.languages.register({ id: "yaml" });
  monaco.languages.setLanguageConfiguration("yaml", {
    comments: {
      lineComment: "--",
      blockComment: ["--[[", "]]"],
    },
  });

  // Define the error checking function for YAML
  const checkYAMLSyntax = (code) => {
    try {
      yaml.load(code);
      return [];
    } catch (error) {
      console.log("error------checkYAMLSyntax", error);
      return [
        {
          severity: monaco.MarkerSeverity.Error,
          message: error.message,
          startLineNumber: error.mark.line,
          startColumn: error.mark.column,
          endLineNumber: error.mark.line,
          endColumn: error.mark.column + 1,
        },
      ];
    }
  };

  // Set up the Lua language
  monaco.languages.register({ id: "lua" });
  monaco.languages.setLanguageConfiguration("lua", {
    comments: {
      lineComment: "--",
      blockComment: ["--[[", "]]"],
    },
  });

  // Define the error checking function
  function checkLuaSyntax(code) {
    try {
      luaparse.parse(code);
      return [];
    } catch (error) {
      return [
        {
          severity: monaco.MarkerSeverity.Error,
          message: error.message,
          startLineNumber: error.line,
          startColumn: error.column + 1,
          endLineNumber: error.line,
          endColumn: error.column + 2,
        },
      ];
    }
  }

  const checkYamlSyntax = (code) => {
    try {
      luaparse.parse(code);
      return [];
    } catch (error) {
      return [
        {
          severity: monaco.MarkerSeverity.Error,
          message: error.message,
          startLineNumber: error.line,
          startColumn: error.column + 1,
          endLineNumber: error.line,
          endColumn: error.column + 2,
        },
      ];
    }
  };

  // 监听值的变化
  editor.onDidChangeModelContent(() => {
    const model = editor.getModel();
    if (model) {
      let markers = [];
      if (id === "xml") {
        console.log("xml");
        markers = checkXMLSyntax(model.getValue());
      } else if (id === "yaml") {
        markers = checkYAMLSyntax(model.getValue());
      } else if (id === "lua") {
        markers = checkLuaSyntax(model.getValue());
      }
      monaco.editor.setModelMarkers(model, id, markers);
    }
    emit(
      "update:modelValue",
      editor.getValue({
        lineEnding: "\n",
      })
    );
  });
};
onMounted(() => {
  init();
});

watch(
  () => props.language,
  (nv, ov) => {
    let id = "plaintext";

    monaco_languages.forEach((language) => {
      language.extensions &&
        language.extensions.forEach((ex) => {
          if (props.language == ex.slice(1)) {
            id = language.id;
          }
        });
    });
    monaco.editor.setModelLanguage(editor.getModel(), id);
  }
);

function updateValue() {
  setTimeout(() => {
    editor.setValue(props.modelValue);
  }, 200);
}
/**
 * @desc 判断当前的languageId
 */
function getLanguageId(curLanguage) {
  return id;
}

/**
 * @desc 设置编辑器的位置
 */
function setPosition(column, lineNumber) {
  editor.setPosition({
    column: column,
    lineNumber: lineNumber,
  });
  editor.revealLineInCenter(lineNumber);
}

/**
 * @desc 获取标记的信息
 */
function getModelMarkers() {
  console.log(
    "monaco.editor.getModelMarkers()",
    monaco.editor.getModelMarkers()
  );
  return monaco.editor.getModelMarkers();
}
defineExpose({ updateValue, getLanguageId, setPosition, getModelMarkers });
</script>

<style></style>

```
