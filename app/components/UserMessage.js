import Image from "next/image";

const UserMessage = ({ message }) => {
    return(
        <div className='flex flex-row mx-4 my-2 self-end'>
            <div className='max-w-5xl break-words h-fit mr-2 bg-white bg-opacity-25 p-4 rounded-md'>
                {message}
            </div>
            <Image
                src='/cyclone.jpg'
                width={500}
                height={500}
                alt="ChatBot Icon"
                className="w-10 h-10 rounded-md ml-2"
            />
        </div>
    )
}

export default UserMessage;