#!/bin/bash
# fix-img-refs.sh

ARTICLES_DIR="./articles"

find "$ARTICLES_DIR" -type f -name "*.png" | while IFS= read -r filepath; do
  filename=$(basename "$filepath")

  # Escape filename for sed replacement (slashes, ampersands, tildes)
  escaped_filename=$(printf '%s' "$filename" | sed -e 's/[\/&~]/\\&/g')

  # Prefix up to AM/PM
  prefix=$(echo "$filename" | sed -E 's/(AM|PM)\.png$//')

  # Escape regex special chars in prefix
  prefix_regex=$(printf '%s' "$prefix" | sed -e 's/[]\/$*.^|[]/\\&/g')

  # Regex: prefix + junk + AM|PM + .png
  regex="${prefix_regex}[^ ]*(AM|PM)\\.png"

  echo "Fixing references for: $filename"
  echo "  Pattern: $regex"

  # Apply to all HTML files
  find . -type f -name "*.html" -exec \
    sed -i -E "s~$regex~$escaped_filename~g" {} +
done
