link_options=-lsfml-graphics -lsfml-window -lsfml-system -W
include_options=-I. -I../02animated-sprite
bin=./bin
target_name=$(bin)/main
# include symlink
source_files=$(shell find -L * -type f -name '*.cpp')
object_files=$(source_files:.cpp=.o)
object_files_name=$(notdir $(object_files))
bin_object_files=$(addprefix $(bin)/,$(object_files_name))
depend_file=$(source_files:.cpp=.d)

all: $(target_name) cleardep

run: $(target_name) cleardep
	$(target_name)
	
cleardep:
	@rm -f $(depend_file)


$(target_name): $(bin_object_files) 
	g++ -o $(target_name) $^ $(link_options)


include $(depend_file)

%.o: 
	g++ -c -o $@ $(shell \
	echo "$(source_files)" | \
	grep -P "\S*?$(basename $(notdir $@)).cpp" -o\
	) $(include_options)
	
# 1.remove old dependency file
# 2.generate new dependency to $@.temp file
# 3.grep the first line of $@.temp file and write to $@
# 4.append the rest of $@.temp file to $@
# 5.remove $@.temp file
%.d: %.cpp
	-@rm -f $@ 
	@g++ -MM $(include_options) $< > $@.temp
	@echo $(bin)/$(basename $(notdir $@)).o `cat $@.temp | grep -P ":.*" -o` > $@
	@cat $@.temp | tail -n +2 >> $@
	@rm -f $@.temp


clear:
	-rm -f $(bin_object_files)

clearall: clear cleardep
	-rm -f $(target_name)

.PHONY: all run clear clearall cleardep