const corsOption = {
origin: [ 'https://picaff.site', 'https://client.picaff.site', ],
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  optionsSuccessStatus: 200,
  credentials: true,
}

export default corsOption
