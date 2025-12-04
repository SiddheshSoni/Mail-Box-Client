
const BASE_URL = `https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/`;

const RequestWrapper = async (path = 'mails.json', { method= 'GET', body = null} ={})=>{
    const url = `${BASE_URL}${path}`;
    const options = {
        method,
        headers:{ 'Content-Type':'application/json'},
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    try{
        const res = await fetch(url, options);
        const data = await res.json();

         if(res.ok){
            return { ok: true, data: data };
        }else{
            let errorMessage = "Failed";
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage };
        }

    }catch(err){
        console.log(err);
    };
};

const storeMail = async (mail) => {
    return await RequestWrapper(`emails.json`,{method:'POST', body: mail});
};
const receiverMailRef = async (receiverKey, emailId) => {
    return RequestWrapper(`users/${receiverKey}/inbox/${emailId}.json`, {
        method: "PUT",
        body: true
    });
};
const senderMailRef= async (senderKey, emailId) => {
    return RequestWrapper(`users/${senderKey}/sent/${emailId}.json`, {
        method: "PUT",
        body: true
    });
};

const getMails = async () => {
    // const userKey = localStorage.getItem("user");
    return await RequestWrapper(`emails.json`,{method:'GET'});
};
const getInboxMails = async () => {
    const userKey = localStorage.getItem("user");
    return await RequestWrapper(`users/${userKey}/inbox.json`,{method:'GET'});
};

const getSentMails = async () => {
    const userKey = localStorage.getItem("user");
    return await RequestWrapper(`users/${userKey}/sent.json`,{method:'GET'});
};

const DeleteMail = async (id) =>{
    const userKey = localStorage.getItem("user");
    return await RequestWrapper(`users/${userKey}/inbox/${id}.json` ,{ method:'DELETE'});
}

const UpdateMail = async (id, update={isRead: true}) =>{
    return await RequestWrapper(`emails/${id}.json` ,{ method:'PATCH', body: update})
}

export { storeMail, getMails, getInboxMails, getSentMails, receiverMailRef, senderMailRef, DeleteMail, UpdateMail};

// original flow work for sent box
// const sendMail = async (mail) => {
//     const recipientKey = mail.to.replace(/[.#$[\]]/g, "_");
//     return await RequestWrapper(`mails/${recipientKey}.json`,{method:'POST', body: mail});
// }; 