# github如何上传和下载大文件

  github当文件大小大于50M就会提示用户，当文件大于100M会限制上传。


## 一、Git中配置和使用Git LFS步骤:

1. **`git lfs install`**：
   - 这个命令用于初始化Git LFS。它会配置Git以便能够使用LFS功能，包括设置钩子和配置文件，以便管理大文件。

2. **`git lfs track "*.your_large_file_extension"`**：
   - 这个命令指定要使用LFS管理的文件类型。`*.your_large_file_extension`是一个模式，您需要将其替换为实际的文件扩展名（例如，`*.psd`、`*.zip`等）。这意味着所有符合该模式的文件将被Git LFS跟踪，而不是存储在Git的常规对象存储中。

3. **`git add .gitattributes`**：
   - Git会在根目录下创建一个名为`.gitattributes`的文件，里面包含了哪些文件类型应该使用LFS进行管理。这个命令将该文件添加到暂存区，以便在下次提交时包含它。

4. **`git add your_large_file`**：
   - 这个命令将您要上传的大文件添加到暂存区。替换`your_large_file`为您的实际文件名。

5. **`git commit -m "Add large file"`**：
   - 这个命令创建一个新的提交，将您之前添加到暂存区的文件保存到版本历史中。`-m "Add large file"`是提交信息，您可以根据需要修改它来描述您所做的更改。

6. **`git push origin main`**：
   - 这个命令将您的本地提交推送到远程仓库（在这里是`origin`，通常指向您克隆的GitHub仓库）。`main`是您要推送的分支名称，确保使用正确的分支名（有些仓库可能使用`master`或其他分支名称）。
   
> [!TIP]
> 这些步骤使您能够将大文件有效地上传到GitHub，并确保它们不会超过GitHub的文件大小限制。
   
## 二、利用git lfs 上传大文件简化步骤

1. 安装git-lfs
```bash
pkg install git-lfs
```
2. 初始化
```bash
git lfs install
```
3. 查看git lfs版本
```bash
git lfs --version
```
4. 在根目录下创建一个名为`.gitattributes`的文件，里面包含了哪些文件类型应该使用LFS进行管理。这个命令将该文件添加到暂存区，以便在下次提交时包含它。
```bash
git add .gitattributes
```
5. 上传文件到暂存区,上传文件所在路径+文件全名包含后缀名。比如:`apk/百度输入法.apk`
```bash
git add apk/百度输入法.apk
```
6. 创建一个新的提交，将您之前添加到暂存区的文件保存到版本历史中。`-m "Add large file"`是提交信息，您可以根据需要修改它来描述您所做的更改。
```bash
git commit -m "Add 百度输入法.apk from apk"

```
7. 将更改推送到远程仓库
```bash
git push
```

## 三、多文件上传步骤

1. **使用Git LFS跟踪多种文件类型**：
   - 如果您希望跟踪多种类型的大文件，可以在运行`git lfs track`时添加多个模式。例如：
     ```bash
     git lfs track "*.psd"
     git lfs track "*.zip"
     ```

2. **添加所有大文件到暂存区**：
   - 您可以一次性添加所有大文件。可以使用通配符来添加特定类型的文件，或者直接添加多个文件名。例如：
     ```bash
     git add file1.psd file2.zip file3.mp4
     ```
   - 如果所有大文件都在同一目录下，您可以使用通配符，例如：
     ```bash
     git add *.psd *.zip
     ```

3. **提交更改**：
   - 提交所有添加的文件：
     ```bash
     git commit -m "Add multiple large files"
     ```

4. **推送到远程仓库**：
   - 最后，将更改推送到远程仓库：
     ```bash
     git push origin main
     ```

> [!TIP]
> 通过这些步骤，您可以方便地将多个大文件一起上传到GitHub。确保在使用`git lfs track`时，您已经添加了所有需要管理的大文件类型。

**大文件上传到github仓库中显示一连串字符串。这段字符串是 Git LFS（Large File Storage）用来管理大文件的元数据。这段代码表示一个大文件的版本控制信息，包含以下几个部分：**

- `version`：指明使用的 Git LFS 版本。
- `oid`：表示文件的唯一标识符（对象 ID），它是文件内容的 SHA256 哈希值。
- `size`：表示文件的大小（以字节为单位）。


## 四、下载特定 Git LFS 文件的步骤

1. **确保安装了 Git LFS**：
   - 确保您已经安装了 Git LFS。如果未安装，可以通过以下命令进行安装：
     ```bash
     git lfs install
     ```

2. **克隆或进入仓库**：
   - 如果您尚未克隆仓库，请使用以下命令：
     ```bash
     git clone <repository-url>
     ```
   - 如果您已经有该仓库的本地副本，请使用 `cd` 命令进入仓库目录：
     ```bash
     cd <repository-directory>
     ```

3. **下载特定的 LFS 文件**：
   - 如果您知道具体要下载的 LFS 文件的路径，可以使用 `git lfs fetch` 命令来获取该特定文件。例如：
     ```bash
     git lfs fetch --all
     ```
   - 这会下载所有 LFS 跟踪的文件，但不会将其替换到工作目录中。

4. **使用 `git lfs checkout`**：
   - 之后，您可以使用 `git lfs checkout` 命令来替换特定文件：
     ```bash
     git lfs checkout <path/to/your-large-file>
     ```

### 示例
假设您要下载的文件名为 `largefile.apk`，并且它位于 `apk/` 子目录中，您可以执行以下命令：
```bash
git lfs fetch --all
git lfs checkout apk/largefile.apk
```

### 注意事项
- Git LFS 只会下载您指定的文件的实际内容，而不是整个仓库的所有大文件。
- 确保您有适当的权限访问这些 LFS 文件，并且它们在远程仓库中是可用的。

通过以上步骤，您就可以成功下载特定的 Git LFS 管理的大文件。

<LastUpdated />

