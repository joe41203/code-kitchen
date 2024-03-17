resource "cloudflare_pages_project" "main" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = var.profuction_branch

  build_config {
    build_caching   = true
    build_command   = "npm run build"
    destination_dir = "dist"
  }
  source {
    type = "github"

    config {
      owner                         = var.github_username
      repo_name                     = var.project_name
      production_branch             = var.profuction_branch
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "none"
    }
  }
}

resource "cloudflare_zone" "main" {
  account_id = var.cloudflare_account_id
  zone       = var.zone
  plan       = "free"
}

resource "cloudflare_zone_dnssec" "main" {
  zone_id = cloudflare_zone.main.id
}

resource "cloudflare_pages_domain" "main" {
  account_id   = var.cloudflare_account_id
  project_name = var.project_name
  domain       = var.zone
}


resource "cloudflare_record" "cname" {
  zone_id = cloudflare_zone.main.id
  name    = "@"
  value   = "${cloudflare_pages_project.main.name}.pages.dev"
  type    = "CNAME"
  ttl     = 1
  proxied = true
}

resource "cloudflare_page_rule" "cache" {
  zone_id = cloudflare_zone.main.id
  target  = "${var.zone}/*"
  actions {
    cache_level    = "cache_everything"
    edge_cache_ttl = 2419200
  }
}

resource "cloudflare_zone_settings_override" "brotli" {
  zone_id = cloudflare_zone.main.id
  settings {
    brotli = "on"
  }
}

resource "cloudflare_zone_settings_override" "http3" {
  zone_id = cloudflare_zone.main.id
  settings {
    http3 = "on"
  }
}
