import toast from "react-hot-toast";
import { X, Send, Image } from "lucide-react";
import React, { useRef, useState } from "react";
import { useChatStore } from "@/store/useChatStore";

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
		<div className="p-4 w-full">
			{/* show image selected */}
			{imagePreview && (
				<div className="mb-3 flex items-center gap-2">
					<div className="relative">
						<img src={imagePreview} alt="Preview"
							className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
						/>
						<button
							onClick={removeImage}
							className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
							type="button"
						>
							<X className="size-3" />
						</button>
					</div>
				</div>
			)}

			<form onSubmit={handleSendMessage} className="flex items-center gap-2">
				{/* form */}
				<div className="flex-1 flex gap-2">
					{/* message input */}
					<input type="text" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)}
						className="bg-gray-800 text-white w-full input input-bordered rounded-lg input-sm sm:input-md" />
					{/* file input */}
					<input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
					{/* file input button */}
					<button type="button" onClick={() => fileInputRef.current?.click()}
						className={`bg-gray-800 hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} >
						<Image size={20} />
					</button>
				</div>

				{/* send button */}
				<button type="submit" className="btn btn-circle" disabled={!text.trim() && !imagePreview} >
					<Send size={20} className="mr-0.5" />
				</button>
			</form>
		</div>
	);
};
