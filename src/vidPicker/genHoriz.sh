#1/bin/bash
ls $1 > /tmp/list.txt
input="/tmp/list.txt"

echo "<!DOCTYPE html>" > x_horiz.html
echo "<html lang=\"en\">" >> x_horiz.html
echo "<head>" >> x_horiz.html
echo "    <meta charset=\"UTF-8\">" >> x_horiz.html
echo "    <link rel=\"stylesheet\" href=\"../src/vidPicker/horizstyle.css\">" >> x_horiz.html
echo "</head>" >> x_horiz.html
echo "" >> x_horiz.html
echo "<body id=\"myBody\">" >> x_horiz.html
echo "    <img class=\"fullPage\" id=\"backgroundX\" src=\"../src/vidPicker/img/BG0.png\">" >> x_horiz.html
echo "    <video src=\"../src/vidPicker/img/init.mp4\" id=\"vidPicked\" onmouseover=\"initVidPlayer(this.id)\"></video>" >> x_horiz.html
echo "    <div id=\"directory\" style=\"display:none\">./</div>" >> x_horiz.html
echo "    <div class=\"selector\">" >> x_horiz.html
echo "    <select id=\"filePicker\" onchange=\"switchVid(this.id,directory.id)\" size=10>  <!--Call run() function-->" >> x_horiz.html

while IFS= read -r line
do
    EVAL=`echo " \"$line\" "`
    if [[ $EVAL == *"mp4"* || $EVAL == *"avi"* ]]; then
          echo "        <option>$line</option>" >> x_horiz.html 
    fi
done < "$input"

echo "    </select>" >> x_horiz.html
echo "    </div>" >> x_horiz.html
echo "</body> " >> x_horiz.html
echo "    <script src=\"../src/vidPicker/functions.js\"></script> " >> x_horiz.html
echo "</html> " >> x_horiz.html

#rm /tmp/list.txt
