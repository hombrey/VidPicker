#1/bin/bash
ls $1 > /tmp/list.txt
input="/tmp/list.txt"

echo "<!DOCTYPE html>" > x_vert.html
echo "<html lang=\"en\">" >> x_vert.html
echo "<head>" >> x_vert.html
echo "    <meta charset=\"UTF-8\">" >> x_vert.html
echo "    <link rel=\"stylesheet\" href=\"../src/vidPicker/vertstyle.css\">" >> x_vert.html
echo "</head>" >> x_vert.html
echo "" >> x_vert.html
echo "<body id=\"myBody\">" >> x_vert.html
echo "    <img class=\"fullPage\" id=\"backgroundX\" src=\"../src/vidPicker/img/BG0.png\">" >> x_vert.html
echo "    <video src=\"../src/vidPicker/img/init.mp4\" id=\"vidPicked\" onmouseover=\"initVidPlayer(this.id)\"></video>" >> x_vert.html
echo "    <div id=\"directory\" style=\"display:none\">./</div>" >> x_vert.html
echo "    <div class=\"selector\">" >> x_vert.html
echo "    <select id=\"filePicker\" onchange=\"switchVid(this.id,directory.id)\" size=3>  <!--Call run() function-->" >> x_vert.html

while IFS= read -r line
do
    EVAL=`echo " \"$line\" "`
    if [[ $EVAL == *"mp4"* || $EVAL == *"avi"* ]]; then
          echo "        <option>$line</option>" >> x_vert.html 
    fi
done < "$input"

echo "    </select>" >> x_vert.html
echo "    </div>" >> x_vert.html
echo "</body> " >> x_vert.html
echo "    <script src=\"../src/vidPicker/functions.js\"></script> " >> x_vert.html
echo "</html> " >> x_vert.html

#rm /tmp/list.txt
