'use client';
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { Loader2 } from "lucide-react";

const CreateButton = ({ userId }: {userId: string}) => {
    const [text, setText] = useState<string>('');
    const [rephrasedText, setRephrasedText] = useState<string>(''); 

    const submitForm = () => {
        setRephrasedText('loading')
        fetch("/api/paraphrase", {
            method: 'POST',
            body: JSON.stringify({
                userId,
                text,
            })
        })
        .then(response => response.json())
        .then(data => {
            setRephrasedText(data.message.choices[0].message.content)
            setText('')
        })
        .catch(error => {
            console.error('Error making the API request:', error);
        });
    };
    return (
        <Dialog>
      <DialogTrigger
        asChild>
        <Button size={'lg'} className='gap-1.5'>Paraphrase</Button>
      </DialogTrigger>

      <DialogContent>
      <DialogHeader className="font-semibold text-gray-900">Paraphrase Text</DialogHeader>
      <Textarea cols={2} value={text} onChange={(e) => { setText(e.target.value) }} className="w-full" rows={4} />
            <Button className="mt-2 gap-1.5" onClick={() => {
                submitForm()
            }}>{rephrasedText === 'loading' ? (<><Loader2 className="h-4 w-4 animate-spin" /> Paraphrase</>): (<>Paraphrase</>)}</Button>
                {rephrasedText !== 'loading' ? <p className="mt-2">{rephrasedText}</p> : null}
      </DialogContent>
    </Dialog>
    )
}

export default CreateButton