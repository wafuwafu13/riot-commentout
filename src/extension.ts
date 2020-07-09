import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let commentout = vscode.commands.registerCommand('riot-comment.riot-commentout', () => {

        let editor: any = vscode.window.activeTextEditor;
		let cur_selection = editor.selection;
		let doc = editor.document;  

        let start: number = cur_selection["start"].line;
        let end: number = cur_selection["end"].line;

        async function main(){
            for (let i = start; i <= end; i++) {
				let text: string = doc.lineAt(i).text;
				let space: number = doc.lineAt(i).firstNonWhitespaceCharacterIndex;
				let start_position: vscode.Position = new vscode.Position(i, space);
				let end_position: vscode.Position = new vscode.Position(i, space+3); // 「// 」を削除
				let range: vscode.Range = new vscode.Range(start_position, end_position);
				if (text.indexOf('//') === -1) {
                    await editor.edit((edit: string | any) => {
                        edit.insert(start_position, '// ');
                    });
				} else {
					await editor.edit((edit: string | any) => {
						edit.delete(range);
				    });
				}
			}
	    }

		main();

    });

    context.subscriptions.push(commentout);
}

export function deactivate() {}
