import Swal from "sweetalert2"


export const confirmPopup =() => {
    return Swal.fire({
        title: 'Confirmation',
        text : 'Êtes-vous sûr de vouloir continuer ?',
        icon: 'question',
        iconColor : 'var(--primaryColor)',
        showCancelButton: true,
        cancelButtonText:'Non',
        confirmButtonText: 'Oui' ,
        backdrop : true,
        buttonsStyling : false,
        customClass : {
            popup : "bg-white dark:bg-sideBarBgColorDark rounded-xl",
            icon : "text-primaryColor-500",
            cancelButton : "btn btn-ghost",
            confirmButton : "btn btn-primary",
            title : "text-black dark:text-white",
            container : "rounded-md",
            actions : "flex justify-center items-center space-x-4",
        }
    })
}

export const formatDate = (record : string) => {
    return (record === null || record === "") ? "" : new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(record));
}
