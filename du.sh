if [ "$#" -ne 1 ]; then
    echo "usage: du.sh [path]"
    exit
fi
echo "output=\"\\" > output.js
du -d3 $1 | sed 's/$/\\n\\/g' >> output.js
echo "\";" >> output.js

open du.html