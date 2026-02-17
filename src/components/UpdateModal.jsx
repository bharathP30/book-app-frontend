

export default function UpdateModal ({ updateFormData, setUpdateFormData, handleUpdate, loading, showForm }){
  const handleSubmit = (e) => {
    e.preventDefault(); 
    handleUpdate(updateFormData._id);
    showForm(false);
  }

  const formatDate = (dateString) => {
  if (!dateString) return "";
  return dateString.split('T')[0];
};

    return(
         <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-8 max-w-md w-full'>
             <form onSubmit={handleSubmit}
                        className='flex flex-col justify-center items-center gap-4 my-10'>
                    <input
                      required
                      type="text"
                      id="bookName"
                      name="title"
                      value={updateFormData.title || ""}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                      placeholder=" Enter book Title here"
                    />

                    <input
                      required
                      type="text"
                      id="bookAuthor"
                      name="author"
                      value={updateFormData.author || ""}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, author: e.target.value })}
                      placeholder=" Enter book Author here"
                    />

                    {/* <input
                      required
                      type="text"
                      id="bookGenre"
                      name="author"
                      value={updateFormData.genre || ""}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, genre: e.target.value })}
                      placeholder=" Enter book Genre here"
                    /> */}

                    <select 
                     name="genre"
                     id="bookGenre" 
                     value={updateFormData.genre || ""}
                     onChange={(e) => setUpdateFormData({...updateFormData, genre: e.target.value})}>
                      <option value="" disabled>select</option>
                      <option value="science">Science</option>
                      <option value="economy">Economy</option>
                      <option value="politics">Politics</option>
                    </select>

                    <input
                      required
                      type="date"
                      id="bookPublishedDate"
                      name="publishedDate"
                      value={formatDate(updateFormData.publishedDate) || ""}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, publishedDate: e.target.value })}
                    />

                    <button type="submit" disabled={loading}>
                      {loading ? "Updating..." : "Update Book"}
                    </button>
            </form>
        </div>
    </div>
    )
}