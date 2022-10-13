
<div align="center">
	<h1 align="center">tsc-less</h1>
</div>
众所周知，Typescript编译器在编译.ts文件时不会处理.less文件，在我们使用tsc编译的.js文件中，代码中.less后缀没有更改，且less文件也没有被复制到编译的文件夹中。tsc-less可以帮助您将编译后的代码中的.less改为.css后缀,并且可以把less文件复制到编译的文件中。

<div align=center><img src="/screenshot.png"/></div>

## 安装

我们建议您使用包管理器 (NPM,[Yarn](https://classic.yarnpkg.com/lang/en/), [pnpm](https://pnpm.io/) 安装  <code>tsc-less</code>

```sh
# 选择一个你喜欢的包管理器

# NPM
$ npm install tsc-less -D

# Yarn
$ yarn add tsc-less

# pnpm
$ pnpm install tsc-less
```

## 添加命令到package.json

```json
"scripts": {
  "build": "tsc -p tsconfig.json && tsc-less -i ./inputFiles -o ./outputFiles",
}
```

### Options

| flag     | description                                          |
| -------- | ---------------------------------------------------- |
| -i --in  | tsc编译的源码路径，如您文件的src、packages              |
| -o --out | tsc编译输出路径 (`tsc --outDir`)                      |

### License

[MIT](/LICENSE)