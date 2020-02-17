import React, { useMemo, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const MUTATION = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const activeStyle = {
  borderColor: "#2196f3",
}

const acceptStyle = {
  borderColor: "#00e676",
}

const rejectStyle = {
  borderColor: "#ff1744",
}

const StyledDropzone = props => {
  const [mutate] = useMutation(MUTATION, {
    onCompleted({ upload }) {
      console.log(upload)
    },
  })
  const onDrop = useCallback(
    files => {
      files.forEach(file => mutate({ variables: { file } }))
    },
    [mutate]
  )
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*", onDrop })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragAccept, isDragReject]
  )

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          isDragReject ? (
            <p>That's not an image file!</p>
          ) : (
            <p>Drop the files here ...</p>
          )
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  )
}

export default StyledDropzone
