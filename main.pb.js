onRecordAuthWithPasswordRequest((e) => {
  const email = e.identity.toLowerCase();

  const whitelisted = $app.findAllRecords(
    'whitelisted_user',
    $dbx.exp('email = {:email}', {
      email: email,
    })
  );

  if (whitelisted.length === 0) {
    throw new Error('This email is not whitelisted.');
  }

  e.next();
});
