## License

Nest is [MIT licensed](LICENSE).

Prepare


# Aop Oop Fp Frp

面向切面编程 aop 拓展功能方便 不影响业务之间的逻辑 逻辑集中管理 利于代码复用

aop 利用 切面的方式进行功能的叠加

oop 面向对象编程

fp frp 面向函数编程 面向函数响应式编程


Functional Programming

Object Oriented Programming

函数式编程 确定的数据输入 输出 没有副作用 相对独立

面向对象编程 抽象现象生活中的事物特征 对于理解友好 封装性 高内聚 低耦合 继承性 多态性

函数响应式编程 适合需要对事件流进行复杂组合的应用场景 响应式多用在异步的场景


# 控制反转和依赖注入

Inversion Of Control

控制反转

Dependency Injection

依赖注入

Ioc是一种设计模式 DI 是 IoC 的具体实现

控制反转 是一种面向对象的编程设计原则 减少代码之间的耦合度 借助第三方实现具有依赖关系的对象之间的解耦

依赖注入 是用来实现ioc的设计模式 它允许在类外创建依赖对象 通过不同的方式将对象提供给 类  比如 手机例子 每次传递不一样的手机类



## 关系模型 

关系模型的本质就是若干个存储数据的二维表 方便数据库进行索引归类 存储查询

非关系型数据库 适合存储大量的数据 适合存储结构化不太明确的数据

常见关联类型 

一对一

一对多

多对多

数据库参考 open.yesapi.cn/list.html

关系型数据库特点

易于维护 使用方便 支持复杂查询效率高的

缺点 读写性能差 灵活性差

场景 业务系统 管理系统 安全性较高的系统

非关系型数据库特点

优点 已于扩展 大文件存储 查询速度快

缺点 复杂计算与联合查询效率低

多格式存储 海量数据 分布式消息系统 统计排行



# 数据库设计三大范式


### 第一大范式
对属性具有原子性 不能多次分解 需要有关联性 关联表

### 第二大范式
对记录的唯一性 要求记录有唯一标识 即实体唯一性 不能存在部分依赖的关系

什么职工号 姓名 职称 项目号 项目名称

职工信息 项目信息 非主键字段必须依赖主键 不能存在部分依赖的关系 项目号 和 名称有依赖

要拆分  防止数据冗余

删除数据异常

逻辑清晰


### 第三大范式

如果一个关系属于第二范式 并且两个 非主键属性之间不存在函数依赖 非主键属性之间的函数依赖也称为传递依赖 这个关系属于第三范式


## 数据库设计 demo


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f979347948e44ad7962c63c992cb2879~tplv-k3u1fbpfcp-watermark.image?)



## QueryBuilder 

QueryBuilder 是 typeorm 最强大的功能之一 他可以让你在不写sql语句的情况下 通过链式调用的方式来构建sql语句

允许你优雅便捷的语法构建 sql 查询， 执行并获得自动转换的实体

QueryBuilder 的简单示例

```ts
const firstUser = await connection
  .getRepository(User)
  .createQueryBuilder("user")
  .where("user.id = :id", { id: 1 })
  .getOne();
```

```sql
SELECT "user"."id" AS "user_id", "user"."name" AS "user_name" FROM "user" "user" WHERE user.id = 1
```

```


## 日志

日志等级

Log 通用日志 按需进行记录

Warning 警告日志 比如尝试多次进行数据库操作

Error 错误日志 比如数据库连接失败 数据库异常

Debug 日志 用于调试 比如 http 请求日志 加载数据日志

Verbose 详细日志 所有操作与详细信息

### 日志按照功能分类

错误日志 方便定位问题 给用户友好提示

调试日志 方便开发

请求日志 记录敏感操作与行为

### 日志记录的位置 

控制台日志 调试用

文件日志 方便回溯和追踪

数据库日志 敏感操作 敏感数据记录


## 异常过滤器

内置 负责整个应用程序抛出所有的异常

异常基础类 nest 提供了一个内置的 httpException 类 