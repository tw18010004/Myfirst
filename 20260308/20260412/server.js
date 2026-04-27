 app.post("/forstamporderno181/:id", async (req, res) => {

    try {

      const id = req.params.id

      let response = await axios.get(dmsHost + 'rest-ws/service/dms/' + id)

      //let pdfFile = await axios.get(dmsHost + 'rest-ws/service/dms/' + id + '/content')

      let resMeta = response.data.data

      let modifiedPdf = await modifyPdf1Stamp(dmsHost + 'rest-ws/service/dms/' + id + '/content', resMeta.orderno181, response.data, resMeta.stampxint, resMeta.stampyint)
      
      //inclue js-base64 , pdf filename encode
      //let filenameBase64Big5 = '=?UTF-8?B?' + Base64.encode(response.data.contents[0].path) + '?=';
      let filenameBase64Big5 = response.data.contents[0].path;
      const form = new FormData();

      form.append('files[]', Buffer.from(modifiedPdf), {
        filename: filenameBase64Big5,
        contentType: 'application/pdf',
      })

      await axios.post(dmsHost + 'rest-ws/service/dms/' + id + '/contents', form, {
        "content-type": "multipart/form-data"
      })


      res.send(response.data)
    } catch (err) {
      console.log(err)
      console.log(dmsHost)
    }
  })
