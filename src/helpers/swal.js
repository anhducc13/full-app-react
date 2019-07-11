import Swal from 'sweetalert2';

export const successSwal = (option, resolve) => {
    Swal.fire(
        option.title,
        option.content,
        'success'
    )
        .then(() => {
            resolve()
        })
}

export const errorSwal = (option, resolve = () => {}) => {
    Swal.fire(
        option.title,
        option.content,
        'error'
      )
        .then(() => {
            resolve()
        })
}

export const okCancelSwal = (option, resolve) => {
    Swal.fire({
        title: option.title,
        text: option.content,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
        .then((ok) => {
            resolve(ok)
        })
}