#!/bin/bash
MYDIR=`pwd`
echo MYDIR;
exit;
scandir(MYDIR);
function scandir(dir) {  
    local cur_dir parent_dir workdir  
    workdir=dir  
    cd ${workdir}  
    if [ ${workdir} = "/" ]  
    then  
        cur_dir=""  
    else  
        cur_dir=$(pwd)  
    fi  
   
    for dirlist in $(ls ${cur_dir})  
    do  
        if test -d ${dirlist};then  
            cd ${dirlist}  
            scandir(${cur_dir}/${dirlist}) 
            cd ..  
        else  
            #echo ${cur_dir}/${dirlist}  
            #做自己的工作  
            local filename=$dirlist  
            #echo "当前文件是："$filename  
            #echo ${#2} #.zip 4  
            #echo ${filename:(-${#2})}  
  
            if [[ ${filename:(-${#2})} = .php ]]   
            then  
                echo "检查文件:"$filename  
                syntaxCheckRs=`php -l $filename`
                if [[ $syntaxCheckRs == *"Fatal"* ]]
                then
                echo "";
                echo "";
                echo "syntax check error";
                echo $syntaxCheckRs;
                echo $filename;
                exit;
            fi

            fi  
        fi  
    done  
} 