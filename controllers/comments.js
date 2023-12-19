





export const createComments = async (req, res) => {
  try {

    res.json({
      messange: 'Comments create'
    })

  } catch (error) {
    res.status(400).json({
      messange: 'Person uncreated'
    })
  }

}