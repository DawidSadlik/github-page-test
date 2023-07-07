export function getUserProperties(user) {
  return [
    { name: "Type", value: user.type },
    { name: "Login", value: user.login },
    { name: "Url", value: user.url },
    { name: "Identifier", value: user.id },
    { name: "Created at", value: user.created_at },
    { name: "Updated at", value: user.updated_at },
  ];
}
