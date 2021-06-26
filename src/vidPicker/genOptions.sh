#1/bin/bash
ls $1 > list.txt

echo $1 > options.txt
input="./list.txt"
while IFS= read -r line
do
    echo "<option>$line</option>" >> options.txt
done < "$input"
rm list.txt


