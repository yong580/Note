# xmake

## Start

- 基础例子
  
  ```lua
  target("mylib")
      set_kind("static")
      add_files("*.cpp")
      add_includedirs("./include")
  target_end()
  
  target("test")
      set_kind("binary")
      add_defines("DEBUG")--定义宏  等价于-DDEBUG
      add_files("*.cpp")
      remove_files("src/test.c")--清除已添加的c文件
      add_incluedirs("./include")--等价于add_cxflags("-I./include")
      add_deps("mylib") --相当于-lmylib，且不需要add_linkdirs()
  
      add_asflags("xxx")--设置编译汇编代码的参数
      add_xmflags("-g", "-O2", "-DDEBUG") --添加用于生成.o时的编译参数
      add_cxflags( "-g","-O2",)--添加c/c++编译规则
  
      add_links("lua") --链接外部静态库或动态库
      add_linkdirs("库路径")
      add_rpathdirs("$(buildir)/lib")--用于执行时能找到动态库
      add_ldflags("-L/xxx", "-lxxx") --添加静态链接参数，静态和动态公用
      add_arflags("xxx") --影响静态库链接参数
      add_shflags("xxx") --动态库链接参数
  
  target_end()
  ```

- 在target外部的修改将会影响所有的target

- 常用api：主要是用到的时候去查官方的文档，比如target构建时查[Project Target - xmake](https://xmake.io/#/manual/project_target)
  
  - 自定义命令参数用于调用设定，`set_options(myoption)`是覆盖性的，在调用后才起作用；`add_options(myoption)`是追加性的
    
    ```lua
    -- Define a hello option
    option("hello")
        set_default(false)
        set_showmenu(true)
        add_defines("HELLO_ENABLE")
    
    target("test")
        -- If the hello option is enabled, this time the -DHELLO_ENABLE macro will be applied to the test target.
        set_options("hello")
    ```
  
  - 使用`set_toolchains`设置和切换整个工具链，如果需要单独设置可以通过`set_toolset()`来对每个target的工具链中的特定工具单独设置，大型工具链一般是整体切换。
    
    ```lua
    target("test1")
        add_files("*.c")
    
    target("test2")
        add_files("*.c")
        set_toolset("cc", "$(projectdir)/tools/bin/clang-5.0")
    ```
    
    定制化工具链,可以借鉴stm32工程的xmake.lua
    
    默认使用cc进行编译，ld进行链接，as进行汇编
    
    ```lua
    toolchain("myclang")
        set_kind("standalone")
        set_toolset("cc", "clang")
        set_toolset("cxx", "clang", "clang++")
        set_toolset("ld", "clang++", "clang")
        set_toolset("sh", "clang++", "clang")
        set_toolset("ar", "ar")
        set_toolset("ex", "ar")
        set_toolset("strip", "strip")
        set_toolset("mm", "clang")
        set_toolset("mxx", "clang", "clang++")
        set_toolset("as", "clang")
    ```
