rm *.svg
wget -i sources.txt

rx='^(.*)-((plain)|(original))(.*).svg$'
# rx='^(.*).svg$'
for f in *.svg; do
  # [[ $f =~ $rx ]] && echo "${BASH_REMATCH[1]}"
  [[ $f =~ $rx ]] && mv "$f" "${BASH_REMATCH[1]}.svg"
done