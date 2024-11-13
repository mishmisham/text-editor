import { getTreeItemPath } from '../getters/getTreeItemPath';

export const searchTextInAllFiles = (value, tree, useBreadcrumbs=false) => {
    return new Promise( async (resolve) => {

        const results = [];
        const searchRegex = new RegExp(value, 'gi');
        const files = tree.filter(item=>item.type === 'file');

        files.forEach(file => {
            const { content } = file;
            const found = [];
            let iterationResult = null;

            while ( (iterationResult = searchRegex.exec(content)) ) {
                
                const lettersBefore = 20;
                const lettersAfter = 100;
                const beforeCut = Math.max(iterationResult.index - lettersBefore, 0);
                const beforeCutLength = Math.min(iterationResult.index - beforeCut, lettersBefore);
                
                const afterCut = iterationResult.index + value.length;
                
                const before = content.substr(beforeCut, beforeCutLength);
                const after = content.substr(afterCut, lettersAfter);

                found.push({
                    position: iterationResult.index,
                    after,
                    before,
                });
            }

            if (found.length) {
                const resultItem = {
                    file,
                    found
                }

                if (useBreadcrumbs) {
                    resultItem.path = getTreeItemPath(file, tree)
                }

                results.push(resultItem);
            }
        })

        resolve(results);
    });
}