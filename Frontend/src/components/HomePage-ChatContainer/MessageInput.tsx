import toast from "react-hot-toast";
import { X, Send, Image } from "lucide-react";
import React, { useRef, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MessageInput() {

	const [text, setText] = useState("");
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const sendMessage = useChatStore(state => state.sendMessage);

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {

		const file = e.target.files?.[0] // Reading file selected from the file input
		if (!file || !file.type.startsWith("image/")) { // Validating that the file is an image
			toast.error("Please select an image file")
			return;
		}
		const reader = new FileReader();
		reader.onloadend = () => { // When the file reading finishes (success or failure), execute this function.
			setImagePreview(reader.result as string)
		}
		reader.readAsDataURL(file) // reading image and convert it to Base64 string
	}

	function removeImage() {
		setImagePreview(null)
		if (fileInputRef.current) fileInputRef.current.value = ""; // might be unecessary because of hidden in the input className.
	}

	async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			// Send message
			await sendMessage({
				text: text.trim(),
				image: imagePreview
			})

			// Clear form
			setText("")
			setImagePreview(null)
			if (fileInputRef.current)
				fileInputRef.current.value = "";
		} catch (error) {
			console.log("Failed to send message:", error)
		}
	}

	return (
		<div className="w-full border-t border-white/10 bg-slate-900/85 p-4">
			{imagePreview && (
				<div className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-2">
					<div className="relative">
						<img src={imagePreview} alt="Preview"
							className="h-20 w-20 rounded-lg border border-slate-700 object-cover"
						/>
						<Button
							onClick={removeImage}
							className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-full"
							variant="destructive"
							size="icon-sm"
							type="button"
						>
							<X className="size-3" />
						</Button>
					</div>
				</div>
			)}

			<form onSubmit={handleSendMessage} className="flex items-center gap-2">
				<div className="flex-1 flex gap-2">
					<Input
						type="text"
						placeholder="Type a message..."
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="h-10 border-white/10 bg-slate-800 text-slate-100 placeholder:text-slate-400"
					/>
					<input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
					<Button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="hidden border border-white/15 bg-slate-800 text-slate-300 hover:bg-slate-700 sm:flex"
						variant="outline"
						size="icon"
					>
						<Image size={20} />
					</Button>
				</div>

				<Button type="submit" size="icon" disabled={!text.trim() && !imagePreview}>
					<Send size={20} className="mr-0.5" />
				</Button>
			</form>
		</div>
	);
};
