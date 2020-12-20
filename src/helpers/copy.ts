export const copy = (content: string) => {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.value = content
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea) 
}