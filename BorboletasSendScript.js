async function enviarScript(scriptText){
	const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
	main = document.querySelector("#main"),
	textarea = main.querySelector(`div[contenteditable="true"]`)
	
	if(!textarea) throw new Error("Não há uma conversa aberta")
	
	for(const line of lines){
		console.log(line)
	
		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('change', {bubbles: true}));
	
		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
		}, 100);
		
		if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}
	
	return lines.length;
}

enviarScript(` 
		Brancas Azuis Amarelas E pretas Brincam Na luz As belas Borboletas. 
		Borboletas brancas São alegres e francas.
		Borboletas azuis Gostam muito de luz.
		As amarelinhas São tão bonitinhas!

		E as pretas, então... Oh, que escuridão!

`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error)