
# 删除分支

开发过程中，多多少少会创建不同分支，那么，我们开发完成之后，分支已经合并到master并且成功发布。当前的分支，就会有删除的需要。

> ` localBranchName` 是你要删除的分支的名字

##  本地

```
git branch -d localBranchName
```
这个输入会有一个问题，如果本地分支没有合并到其他分支，或者没有对应的远程分支，删除时则会提示这个错误:

`The branch 'localBranchName' is not fully merged`

这个时候，我们还是想要删除分支的数，就需要强制删除
```
git branch -D localBranchName
```
## 远程
```
git push origin --delete remoteBranchName
```
# 不小心删除未合并成功的分支
心太急了，在提了合并请求之后，看到什么消息提示，就删除了正在合并的分支。也不知道会不会影响当前合并，，，远程和本地都被自己删除了，想找回

 1. 查找历史提交的commit

> `git reflog` 记录你的每一次命令
> `--date=iso ` 以标准时间显示

```
git reflog show --date=iso
```

 2. 找到记录里面，你想要恢复的那哥分支的最后一次commit
 3. 查看commit ID对应的那次提交的详情信息，看看是不是自己想要恢复的那个分支的最后一次提交
 
 ```
 git show commit
 ```
如果确认的话，下一步

  4. 恢复分支到本地
```
git checkout -b  BranchName  commitID
```
这样就恢复本地分支了，远程的，自己重新推送一遍就好啦。

---

# 总结
`提示：这里对文章进行总结：`
以上就是目前我在工作中经常使用到的指令介绍，持续更新中~