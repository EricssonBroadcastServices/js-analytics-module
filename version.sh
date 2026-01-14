git add package-lock.json
git add src

git commit -m "chore: bump package version"

newVersion=v`node -p "require('package.json').version"`
echo "Creating tag $newVersion"
git tag $newVersion

git push && git push --tags
