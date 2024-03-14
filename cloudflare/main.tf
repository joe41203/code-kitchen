resource "cloudflare_pages_project" "main" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = var.profuction_branch

  build_config {
    build_caching   = false
    build_command   = "npm run build"
    destination_dir = "dist"
  }
  source {
    type = "github"

    config {
      owner                         = var.your_github_username
      repo_name                     = var.project_name
      production_branch             = var.profuction_branch
      deployments_enabled           = true
      production_deployment_enabled = true
    }
  }
}
