output "project_url" {
  value = cloudflare_pages_project.main.subdomain
}

output "name_servers" {
  value = cloudflare_zone.main.name_servers
}
