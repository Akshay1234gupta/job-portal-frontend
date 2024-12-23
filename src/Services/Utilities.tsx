const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { year: 'numeric' as const, month: 'short' as const };
    return date.toLocaleString('en-US', options);
}

function timeAgo(time: string) {
    const now = new Date();
    const postDate = new Date(time);
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000); // Difference in seconds

    if (seconds < 60) {
        return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
}
const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

}

const formatInterviewTime = (dateStr: any) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
}

function openBase64PDF(base64String: string) {

    const byteCharacters = atob(base64String);

    const byteNumbers = new Array(byteCharacters.length);


    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });


    const blobUrl = URL.createObjectURL(blob);

    const newTab = window.open(blobUrl, "_blank");

    // If the new tab fails to open, alert the user
    if (!newTab) {
        alert("Please allow popups for this website.");
    }
}

export { formatDate, timeAgo, getBase64, formatInterviewTime, openBase64PDF }